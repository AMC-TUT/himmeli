
json.id @person.id
json.firstName @person.first_name
json.scores @person.events.sum('scores')
json.level @person.level
json.updatedAt @person.updated_at
json.scoresPerEvent @person.scores_per_event_per_level
#json.events @person.events, :id, :level, :scores

