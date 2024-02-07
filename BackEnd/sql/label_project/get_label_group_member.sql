select
	lgm.*,
	name||'('||account||')' name
from
	lattek.label_group_member lgm ,
	lattek.accounts a
where
	group_id = ${group_id}
	and a.account_uid = lgm.account_uid