delete
from
	lattek.label_data_yolo
where
	label_type_id not in (
	select
		label_type_id
	from
		lattek.label_type )