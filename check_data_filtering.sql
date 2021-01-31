--TSQL: Verificar filtros aplicados al json
declare @json varchar(max)

select @json = BulkColumn
    from
        openrowset(
            BULK
            'C:\xampp\htdocs\PHP01\data-1.json',
            SINGLE_CLOB
        ) j

select id, ciudad, tipo, precio
    From
        (
        select
            aa.[key] row_id,
            bb.[key],
            bb.[value]
            From
                (select [key], [value] from openjson(@json)) aa
                cross apply (select [key], [value] from openjson(aa.[value])) bb
        ) s
        pivot (
            min(value)
            for [key] in (
                [Id],
                [Direccion],
                [Ciudad],
                [Telefono],
                [Codigo_Postal],
                [Tipo],
                [Precio]
            )
        ) p
    where
        Ciudad = 'New York'
        and Tipo = 'Casa de Campo'
        and replace(replace(Precio, '$', ''), ',', '') >= 200
        and replace(replace(Precio, '$', ''), ',', '') <= 80000
