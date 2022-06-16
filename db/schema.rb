# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_06_16_231807) do
  create_table "games", force: :cascade do |t|
    t.integer "guest_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "moves"
    t.string "color"
    t.integer "order"
    t.integer "hosting_user_id"
    t.integer "joining_user_id"
    t.integer "status", default: 0
    t.index ["guest_user_id"], name: "index_games_on_guest_user_id"
    t.index ["hosting_user_id"], name: "index_games_on_hosting_user_id"
    t.index ["joining_user_id"], name: "index_games_on_joining_user_id"
  end

  create_table "guest_tokens", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "guest_users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skins", force: :cascade do |t|
    t.string "name"
    t.string "host_color"
    t.string "joining_color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tokens", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "guest_user_id"
    t.string "token"
    t.index ["guest_user_id"], name: "index_tokens_on_guest_user_id"
  end

  add_foreign_key "games", "guest_users", column: "hosting_user_id"
  add_foreign_key "games", "guest_users", column: "joining_user_id"
  add_foreign_key "tokens", "guest_users"
end
