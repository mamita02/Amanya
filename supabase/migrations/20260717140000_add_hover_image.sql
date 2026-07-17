alter table public.parfums
add column if not exists hover_image text;

alter table public.parfums
add column if not exists families text[];

update public.parfums
set families = array[family]
where families is null or cardinality(families) = 0;
