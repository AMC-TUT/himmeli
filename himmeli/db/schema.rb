# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140403081103) do

  create_table "events", force: true do |t|
    t.integer  "person_id"
    t.integer  "duration",   default: 0
    t.integer  "level",      default: 0
    t.integer  "scores",     default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "aborted",    default: 0
    t.integer  "version_id"
  end

  add_index "events", ["person_id"], name: "index_events_on_person_id", using: :btree
  add_index "events", ["version_id"], name: "index_events_on_version_id", using: :btree

  create_table "items", force: true do |t|
    t.integer  "event_id"
    t.integer  "duration",   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "target",     default: 0
    t.integer  "pointer",    default: 0
    t.integer  "answer",     default: 0
  end

  add_index "items", ["event_id"], name: "index_items_on_event_id", using: :btree

  create_table "people", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "scores",     default: 0
    t.integer  "level",      default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", force: true do |t|
    t.integer  "person_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "last_level", default: 1
  end

  add_index "settings", ["person_id"], name: "index_settings_on_person_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "versions", force: true do |t|
    t.integer  "hit_points",   default: 0
    t.integer  "target_speed", default: 0
    t.integer  "rows",         default: 0
    t.integer  "columns",      default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "levels",       default: 6
  end

end
