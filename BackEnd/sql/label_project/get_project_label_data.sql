select
	data_id,
	data_name,
	data_path,
	project_id
from
	lattek.label_data
where
	project_id = ${project_id}