# Changelog

# [2.2.7]
 - Fix import bug affecting pre-V12 versions [[#28]] (thanks [Skepickle](https://github.com/skepickle))

# [2.2.6]
 - Upgrade compatible core version to 12
 - Upgrade compatible system versions
 - Fix compatibility warnings in Foundry V12

# [2.2.5]
 - Upgrade compatible core version to 11 & DnD5e to 3.0

# [2.2.4]
 - Remove unwanted logging code

# [2.2.3]
 - Fix issue with bar sizing [[#17]]

# [2.2.2]
 - Add support for [D&D 4e] [[#16]]
 - Add [Finnish] translation

# [2.2.1]
 - Fix bug with case sensitivity in system IDs [[#18]]

# [2.2.0]
 - Adjust patching to use libWrapper if available
 - Fix issue with temp HP color not being configurable in Toolkit13
 - Upgrade compatible core version to v10

# [2.1.2]
 - Add support for [PTU](https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System) (thanks [GSV A Nest fo Kindled Embers](https://github.com/GSV-a-Nest-of-Kindled-Embers))

# [2.1.1]
 - Upgrade compatible core version to v9

# [2.1.0]
 - Add opacity control to theme customization [[#11]]
 - Upgrade compatible core version to 0.8.9

# [2.0.5]
 - Fix bug with undefined health bonus in Shadow of the Demon Lord (thanks [Patrick](https://github.com/patrickporto))

# [2.0.4]
 - Fix bug with bar drawing in Pathfinder 2e (thanks Infamous#2922)
 - Upgrade compatible core version to 0.8.8

# [2.0.3]
 - Upgrade compatible core version to 0.8.6

# [2.0.2]
 - Add support for [Tormenta20] (thanks [Matheus](https://github.com/mclemente))
 - Add Brazilian Portuguese translation (also thanks Matheus)
 - Upgrade compatible core version to 0.8.5

# [2.0.1]
 - Add ability to customize bar background and border
 - Upgrade compatible core version to 0.8.2
 - Prevent needing to rerender whole canvas 0.8.x versions
 - Fix build bug resulting in missing files for some people who downloaded 2.0.0

# [2.0.0]
 - Add theme customization to change the colors of the HP bars
 - Rework the bar design to be cleaner and clearer
 - Add health bonus indicator for [Shadow of the Demon Lord] (thanks again [Patrick](https://github.com/patrickporto))

# [1.2.4]
 - Add support for [Shadow of the Demon Lord] (thanks [Patrick](https://github.com/patrickporto))

# [1.2.3]
 - Upgrade compatible core version to 0.8.1
 - Fix compatibility for systems that extend the base Token class

# [1.2.2]
 - Add support for [Toolkit13 (13th Age Compatible)](https://foundryvtt.com/packages/archmage) (thanks [Cody](https://github.com/cswendrowski))

# [1.2.1]
 - Remove conflict note about [Bar Brawl](https://gitlab.com/woodentavern/foundryvtt-bar-brawl) which now works great! (thanks DJ Addi#1087)

# [1.2.0]
 - Add support for [Pathfinder 1e] and [Pathfinder 2e]

# [1.1.0]
 - Add support for [D&D 3.5e]
 - Upgrade compatible core version to 0.8.0

# [1.0.3]
 - Improve legibility of negative max HP adjustments
 - Fix bug when max HP is negative
 - Fix bug causing max HP bar to be drawn in the wrong position when temp HP exceeds max

# [1.0.2]
 - Fix compatibility issue with [Sky's Alternate D&D 5e Character Sheet](https://github.com/Sky-Captain-13/foundry/tree/master/alt5e) (thanks Jace Bobius#8094)

# [1.0.1]
 - Enable custom HP bar for NPCs (you'll need an alternate sheet like [Tidy5e](https://foundryvtt.com/packages/tidy5e-sheet) to change temp & max HP on NPCs)

# 1.0.0
 - Initial public release
 - Change the appearance of the HP bar to visualize temp and max HP


[1.0.1]: https://github.com/arbron/fvtt-hp-bar/compare/1.0.0...1.0.1
[1.0.2]: https://github.com/arbron/fvtt-hp-bar/compare/1.0.1...1.0.2
[1.0.3]: https://github.com/arbron/fvtt-hp-bar/compare/1.0.2...1.0.3
[1.1.0]: https://github.com/arbron/fvtt-hp-bar/compare/1.0.3...1.1.0
[1.2.0]: https://github.com/arbron/fvtt-hp-bar/compare/1.1.0...1.2.0
[1.2.1]: https://github.com/arbron/fvtt-hp-bar/compare/1.2.0...1.2.1
[1.2.2]: https://github.com/arbron/fvtt-hp-bar/compare/1.2.1...1.2.2
[1.2.3]: https://github.com/arbron/fvtt-hp-bar/compare/1.2.2...1.2.3
[1.2.4]: https://github.com/arbron/fvtt-hp-bar/compare/1.2.3...1.2.4
[2.0.0]: https://github.com/arbron/fvtt-hp-bar/compare/1.2.4...2.0.0
[2.0.1]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.0...2.0.1
[2.0.2]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.1...2.0.2
[2.0.3]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.2...2.0.3
[2.0.4]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.3...2.0.4
[2.0.5]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.4...2.0.5
[2.1.0]: https://github.com/arbron/fvtt-hp-bar/compare/2.0.5...2.1.0
[2.1.1]: https://github.com/arbron/fvtt-hp-bar/compare/2.1.0...2.1.1
[2.1.2]: https://github.com/arbron/fvtt-hp-bar/compare/2.1.1...2.1.2
[2.2.0]: https://github.com/arbron/fvtt-hp-bar/compare/2.1.2...2.2.0
[2.2.1]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.0...2.2.1
[2.2.2]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.1...2.2.2
[2.2.3]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.2...2.2.3
[2.2.4]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.3...2.2.4
[2.2.5]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.4...2.2.5
[2.2.6]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.5...2.2.6
[2.2.7]: https://github.com/arbron/fvtt-hp-bar/compare/2.2.6...2.2.7

[#11]: https://github.com/arbron/fvtt-hp-bar/issues/11
[#16]: https://github.com/arbron/fvtt-hp-bar/issues/16
[#17]: https://github.com/arbron/fvtt-hp-bar/issues/17
[#18]: https://github.com/arbron/fvtt-hp-bar/issues/18
[#28]: https://github.com/arbron/fvtt-hp-bar/issues/28

[D&D 3.5e]: https://foundryvtt.com/packages/D35E
[D&D 4e]: https://foundryvtt.com/packages/dnd4e
[D&D 5e]: https://foundryvtt.com/packages/dnd5e
[Pathfinder 1e]: https://foundryvtt.com/packages/pf1
[Pathfinder 2e]: https://foundryvtt.com/packages/pf1
[Shadow of the Demon Lord]: https://foundryvtt.com/packages/demonlord
[Tormenta20]: https://foundryvtt.com/packages/tormenta20

[Finnish]: https://weblate.foundryvtt-hub.com/projects/arbron-hp-bar/main/fi/
[Portuguese (Brazil)]: https://weblate.foundryvtt-hub.com/projects/arbron-hp-bar/main/pt_BR/
