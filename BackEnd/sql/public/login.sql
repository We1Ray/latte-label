select
	*
from
	lattek.accounts a
where
	email = ${email}
	and password = ${password}