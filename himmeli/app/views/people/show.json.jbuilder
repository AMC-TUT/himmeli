
json.id @person.id
json.firstName @person.first_name
json.scores @person.events.sum('scores')
json.level @person.level
json.updatedAt @person.updated_at

json.medianReplyTimes @person.median_reply_times
json.scoresPerEvent @person.scores_per_event_per_level
