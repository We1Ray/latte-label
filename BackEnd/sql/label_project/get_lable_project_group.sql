select
	lg.group_id value,
	lg.group_name label,
	lgep.project_id,
	${update_user} update_user
from
	lattek.label_group lg,
	lattek.label_group_enable_project lgep
where
	lg.group_id = lgep.group_id
	and lgep.project_id = ${project_id}