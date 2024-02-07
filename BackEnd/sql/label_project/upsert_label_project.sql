insert
	into
	lattek.label_project (project_id,
	project_name,
	"describe",
	update_user,
	update_date)
values (${project_id},
${project_name},
${describe},
${update_user},
now())
on
conflict (project_id) do
update
set
	project_name = ${project_name},
	"describe" = ${describe},
	update_user = ${update_user},
	update_date =now()
