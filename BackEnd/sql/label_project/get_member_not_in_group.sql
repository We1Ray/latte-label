select
	account_uid value,
	name || '(' || account || ')' label,
	 ${group_id} group_id,
	 ${update_user} update_user
from
	lattek.accounts a
where
	account_uid not in (
	select
		account_uid
	from
		lattek.label_group_member lgm
	where
		lgm.group_id = ${group_id})