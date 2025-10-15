execute as @a[tag=!init_join] unless entity @s[tag=joined] run tag @s add init_join
execute as @a[tag=init_join] run tellraw @a {"rawtext":[{"text":"§e§l"},{"selector":"@s"},{"text":"§r joined  SMP for the first time!\n\nTo start, type a command §o§e/start§r and setup your character."}]}
execute as @a[tag=init_join] run tag @s add joined
execute as @a[tag=joined] run tag @s remove init_join
