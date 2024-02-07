select
	ld.data_id ,
	ld.data_name ,
	lt.label_type_id ,
	lt.label_type_name,
	ldy.x,
	ldy.y,
	ldy.w,
	ldy.h
from
	lattek.label_data ld ,
	lattek.label_data_yolo ldy,
	lattek.label_type lt
where
	ld.data_id = ldy.data_id
	and lt.label_type_id = ldy.label_type_id
	and ld.project_id = ${project_id}