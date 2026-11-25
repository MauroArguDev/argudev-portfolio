---
title: "Building Guldr: a local-first finance app for iPhone"
date: 2026-11-30
description: "How Guldr, a local-first personal finance app for iPhone, is built: no backend, money as integers, a shared Swift package and Swift 6."
slug: building-guldr
---

Guldr is out on the App Store. It's a personal finance app for iPhone with one rule that shaped everything else: your data never leaves your phone. There's no account to create, no server to sync with and no analytics SDK. The App Store privacy label reads **Data Not Collected**, and I wanted that to be true by construction, not by policy.

This post is about how it's built and the decisions behind it. The code is public on [GitHub](https://github.com/MauroArguDev/Guldr), and every decision mentioned here links to its record in the repo.

## What it does

You log income and expenses from a sheet that opens straight to a keypad, because logging has to take seconds or it doesn't happen. On top of that log, Guldr gives you a balance, monthly budgets per category with alerts at 80% and 100%, and charts of where the money goes. A daily reminder, a logging streak and achievements in bronze, silver and gold exist for one reason: to keep the log complete. They reward logging, never spending less, and none of them can be bought.

It also has Home Screen widgets, a Face ID lock, CSV export, and full support for English, Spanish, VoiceOver, Dynamic Type and Reduce Motion.

## Decision 1: no backend at all

The simplest way to keep data private is to never hold it. Guldr stores everything in SwiftData, inside an App Group container shared with the widget extension. The app opens the store read-write; the widget opens the same store read-only, so it can show the balance and the streak without ever being able to corrupt them ([ADR 007](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/007-persistence-and-widget-data.md)).

"No backend" doesn't mean "no sync, ever." iCloud sync is the next release, through the user's own private CloudKit database. To make that a feature instead of a migration, the models follow CloudKit's rules from day one: no unique constraints, every relationship optional, every property with a default value. When sync turns on, existing data uploads as it is.

## Decision 2: money is never a Double

Every amount is an `Int64` in the minor units of its currency, stored next to an ISO 4217 code ([ADR 005](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/005-money-representation.md)). Floating point can't represent most decimal fractions exactly, so `0.1 + 0.2` isn't `0.3`. That's a curiosity in a tutorial and a real bug in a budget that sums thousands of transactions.

Storing the currency on every transaction also means Guldr never guesses. Totals, budgets and charts use the active currency. Converting between currencies would need exchange rates from the network, which would break the first rule.

## Decision 3: the domain is a Swift package

All the logic that can be pure lives in `GuldrCore`, a local Swift package linked by both the app and the widget ([ADR 006](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/006-guldr-core-package.md)): money and formatting, month calculations, budget status, the streak, achievements and the monthly recap. The app keeps the views, the view models and the system integrations like notifications, Face ID and sharing.

The package builds for macOS too, only so `swift test` runs without a simulator. That keeps the feedback loop to seconds, and the widget and the app can't disagree about a number because they run the same code.

## Decision 4: Swift 6, main actor by default

The app targets use Swift 6 language mode with `MainActor` as the default isolation ([ADR 003](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/003-concurrency-defaults.md)). Most of an app like this is UI and should run on the main actor anyway, so the default removes a lot of annotations and makes the exceptions stand out. The domain package goes the other way: it's `nonisolated` by default, because pure calculations shouldn't care which thread calls them.

## Decision 5: derive state instead of counting it

The logging streak looks like a counter, but it isn't stored as one ([ADR 012](https://github.com/MauroArguDev/Guldr/blob/main/docs/decisions/012-logging-streak.md)). Guldr stores the set of days you logged, and computes everything from it: the current run, the best run, the freezes you've earned (one every 7 days, up to 2) and whether yesterday can still be repaired. A counter can drift, double-count or disagree between the app and the widget. A function of the logged days can't, and it's trivially testable.

## How it was built

From the first commit to the App Store took eight weeks. Every change went through a branch, a pull request and CI on GitHub Actions: SwiftLint with zero warnings, the package tests and the app tests, 440 in total. Every decision that wasn't obvious became an architecture decision record, sixteen so far, so the reasoning lives next to the code.

Five people tested it on TestFlight over five builds. One of those builds taught me the most: on iOS 27, the add sheet froze at 100% CPU when you tapped the date. I pulled the build from App Review, found the cause in a cycle between UIKit and SwiftUI's view graph, and shipped the fix in build 5. That bug gets its own post next.

## What's next

Version 1.1 brings iCloud sync and a CSV import, so nothing you log can be lost and it follows you to every iPhone you own. After that comes a one-time Gold unlock and, further out, receipt scanning that runs entirely on the device.

If you try it, I'd love to hear what you think. [Download Guldr on the App Store](https://apps.apple.com/app/id6826453592), or read the code on [GitHub](https://github.com/MauroArguDev/Guldr).
