insert
	into
	lattek.label_group_member (group_id,
	account_uid,
	update_user,
	update_date)
values (${group_id},
${account_uid},
${update_user},
now())
on
conflict (group_id,
account_uid) do nothing