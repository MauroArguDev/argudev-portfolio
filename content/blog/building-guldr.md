---
title: "Building Guldr: a local-first finance app for iPhone"
date: 2026-11-30
description: "Guldr is a personal finance app for iPhone that keeps your data on your phone. Here's what it does and the decisions behind how it's built."
slug: building-guldr
---

Guldr is live on the App Store! It's a personal finance app for iPhone, built around one simple promise: your money data stays on your phone. There's no account to sign up for, no server syncing in the background and no analytics watching what you tap. The App Store privacy label says **Data Not Collected**, and I wanted that to be true because of how the app is built, not just because a policy says so.

In this post I'll walk you through what Guldr does and the handful of decisions that shaped it. You don't need to be an iOS developer to follow along. If you are one, the code is public on [GitHub](https://github.com/MauroArguDev/Guldr), and each decision links to its full write-up in the repo.

## What it does

When you open Guldr to log an expense, you land straight on a keypad. That's on purpose: if logging takes more than a few seconds, people stop doing it, and a finance app is only as useful as the data you put in.

From that log, Guldr shows your balance, lets you set monthly budgets per category (with a heads-up at 80% and again at 100%) and draws charts of where your money goes. There's also a daily reminder, a logging streak and achievements in bronze, silver and gold. They're there for one reason: to help you keep the log complete. They reward you for logging, never for spending less, and none of them can be bought.

On top of that, you get Home Screen widgets, a Face ID lock, CSV export, English and Spanish, and full support for VoiceOver, Dynamic Type and Reduce Motion.

## No servers, on purpose

The simplest way to protect someone's data is to never have it. Everything in Guldr lives on your phone, stored with SwiftData, Apple's own database framework. The Home Screen widget reads from the same place, but it can only read: it shows your balance and your streak, and it can't change them by accident ([ADR 007](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/007-persistence-and-widget-data.md)).

"No servers" doesn't mean "no sync, ever." iCloud sync is coming in the next release, through your own private iCloud database. I planned for it from day one, so when it arrives, the data you already have uploads as it is. No migration, no starting over.

## Money is never a decimal number

This one sounds nerdy, but it matters. Computers are surprisingly bad at decimals: in most programming languages, `0.1 + 0.2` doesn't come out as exactly `0.3`. That's a fun quirk in a tutorial and a real problem in an app that adds up thousands of transactions.

So Guldr stores every amount as a whole number in the smallest unit of its currency, along with the currency itself ([ADR 005](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/005-money-representation.md)). $12.50 is saved as 1250 cents, and the math is always exact.

Keeping the currency on every transaction also means Guldr never has to guess. Totals, budgets and charts use your active currency. Converting between currencies would mean fetching exchange rates from the internet, and that would break the first rule.

## One brain for the app and the widget

All the logic that doesn't depend on the screen lives in its own package, `GuldrCore` ([ADR 006](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/006-guldr-core-package.md)): formatting money, working out months, budget status, the streak, achievements and the monthly recap. The app keeps the screens and the parts that talk to the system, like notifications, Face ID and sharing.

Because the app and the widget run the same code, they can never disagree about a number. And since the package also builds for the Mac, its tests run in seconds without starting an iPhone simulator. Fast tests are tests you actually run.

## Letting Swift catch the hard bugs

Apps do many things at once, and bugs where two pieces of code touch the same data at the same time are some of the hardest to track down. Swift 6 catches them while the code compiles, before the app ever runs, so Guldr uses it in its strictest mode ([ADR 003](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/003-concurrency-defaults.md)).

Most of an app like this is user interface, which runs on the main thread anyway, so I made that the default. That keeps the code clean and makes the few exceptions stand out. The shared package goes the other way: its calculations don't care which thread calls them.

## The streak isn't a counter

The logging streak looks like a number that goes up every day, but that's not how it's stored ([ADR 012](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/012-logging-streak.md)). Guldr keeps the list of days you logged something and works everything out from it: your current streak, your best one, the freezes you've earned (one every 7 days, up to 2) and whether a missed yesterday can still be repaired.

Why bother? A counter can drift, count the same day twice, or show one number in the app and another in the widget. A list of days can't, and it's easy to test.

## How it got built

From the first commit to the App Store took eight weeks. Every change went through a pull request and automatic checks on GitHub: a linter with zero warnings and 440 tests across the app and the shared package. Every decision that wasn't obvious got written down as an architecture decision record, sixteen so far, so the reasoning lives right next to the code.

Five people tested Guldr on TestFlight over five builds. One of those builds taught me the most: on iOS 27, the add sheet froze at 100% CPU the moment you tapped the date. I pulled the build from App Review, traced the freeze to a loop between UIKit and SwiftUI, and shipped the fix in build 5. That bug gets its own post next.

## What's next

Version 1.1 brings iCloud sync and CSV import, so nothing you log can be lost and your data follows you to every iPhone you own. After that comes a one-time Gold unlock and, further down the road, receipt scanning that runs entirely on your phone.

If you give it a try, I'd love to hear what you think. [Download Guldr on the App Store](https://apps.apple.com/app/id6826453592), or take a look at the code on [GitHub](https://github.com/MauroArguDev/Guldr).
