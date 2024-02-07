select
	distinct lg.*
from
	lattek.label_group lg ,
	lattek.label_group_member lgm
where
	lg.group_id = lgm.group_id
	and lgm.account_uid = ${account_uid}