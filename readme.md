# Arbron's Improved HP Bar

Modifies the HP bar in in [5e](https://foundryvtt.com/packages/dnd5e) and [3.5e](https://foundryvtt.com/packages/D35E) to represent the complexities of character health.


### Temp HP
Displays a blue bar overlaying the current HP. If temp HP exceeds max HP, the bar will rescale to properly represent the proportion of temp to max.

![Temp HP](images/temp-hp.jpg "Temp HP")


### Max HP (5e only)
Displays positive temp max HP as a light grey addition to the bar on the right side and negative max as a dark gray bar. The color of the current HP bar is changed to accurately reflect the current max HP.

![Positive Max HP](images/max-hp-positive.jpg "Positive Max HP")
![Negative Max HP](images/max-hp-negative.jpg "Negative Max HP")


### Nonlethal (3.5e only)
Displays an outline over the HP bar that is light green if the current nonletal damage is less than current HP (aka not staggered) and red if it exceeds current HP.

![Nonletal](images/nonlethal.jpg "Nonletal Damage")


### Compatibility Issues
Does not work with [Bar Brawl](https://gitlab.com/woodentavern/foundryvtt-bar-brawl) due to that module implementing its own drawing method.
