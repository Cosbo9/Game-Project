# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Skin.delete_all
Skin.create({name: "Default", host_color: "#000000", joining_color: "#ff0000"})
Skin.create({name: "Alt", host_color: "#ffff00", joining_color: "#ff0000"})
Skin.create({name: "Unicorn", host_color: "#a325d9", joining_color: "#e01d9f"})
