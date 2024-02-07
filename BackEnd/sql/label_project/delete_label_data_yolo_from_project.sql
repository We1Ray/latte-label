delete
from
	lattek.label_data_yolo
where
	data_id in (
	select
		data_id
	from
		lattek.label_data
	where
		project_id = ${project_id}
	)