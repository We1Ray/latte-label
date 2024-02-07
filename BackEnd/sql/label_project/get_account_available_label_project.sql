select
	*
from
	lattek.label_project lp
where
	lp.project_id in(
	select
		distinct lgep.project_id
	from
		lattek.label_group_member lgm ,
		lattek.label_group_enable_project lgep
	where
		lgm.account_uid = ${account_uid}
		and lgm.group_id = lgep.group_id
	)