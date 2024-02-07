insert
	into
	lattek.label_group (group_id,
	group_name,
	group_enabled,
	update_user,
	update_date)
values (${group_id},
${group_name},
${group_enabled},
${update_user},
now())
on
conflict (group_id) do
update
set
	group_name = ${group_name},
	group_enabled = ${group_enabled},
	update_user = ${update_user},
	update_date = now()