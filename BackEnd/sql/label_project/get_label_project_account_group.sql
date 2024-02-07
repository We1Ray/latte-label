select
	lg.group_id value,
	lg.group_name label,
	${project_id} project_id,
	${account_uid} update_user
from
	lattek.label_group lg,
	lattek.label_group_member lgm
where
	lg.group_id = lgm.group_id
	and lgm.account_uid = ${account_uid}