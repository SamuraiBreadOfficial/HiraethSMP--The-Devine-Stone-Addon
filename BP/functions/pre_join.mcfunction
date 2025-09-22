execute if entity @a[tag=!init_join] run tag @a[tag=!joined] add init_join
execute as @a[tag=init_join] run scoreboard objectives add balance dummy
execute as @a[tag=init_join] run scoreboard objectives add bank dummy
execute as @a[tag=init_join] run scoreboard players add @s balance 0
execute as @a[tag=init_join] run scoreboard players add @s bank 0

execute at @a[tag=init_join] run structure load mystructure:main_menu_v2 9990 110 9990

execute as @a[tag=init_join] run tp @s 10000 120 10000 false


execute as @a[tag=init_join] run tellraw @a {"rawtext":[    {"text":"§e§l"},    {"selector":"@s"},    {"text":"§r §ajoined for the first time!"},    {"text":"\n"},    {"text":"\n"},    {"text":"§nIf you are not on our Discord server, please join it and apply."},    {"text":"\n"},    {"text":"Otherwise you will get Banned as we are closed Whitelist SMP."}]}
replaceitem entity @a[tag=init_join] slot.hotbar 8 hsmp:hsmp_menu
execute as @a[tag=init_join] run tag @s add joined
execute as @a[tag=init_join] run tag @a remove init_join