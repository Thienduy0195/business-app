drop database business_db;


create database business_db;

INSERT INTO category VALUES (1,'CODE1','Category1'), (2,'CODE2','Category2'),(3,'CODE3','Category3'), (4,'CODE4','Category4'), (5,'CODE5','Category5');

 INSERT INTO product_type VALUES (1,'product_type1'), (2,'product_type2'),(3,'product_type3'), (4,'product_type4'), (5,'product_type5'); 

INSERT INTO product (quantity, avatarURL, code,description,discount_percent, retail_price, name, note, review_score, sale_price, title, weight, category_id, product_type_id) 
VALUES (50,'https://static.chus.vn/images/thumbnails/500/500/detailed/238/10124_23_F1.jpg','PROD001','Product description 1',10,285000,'Bộ Bầu Cua Lộc Uyển','Product note 1',4.5,255000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả',100,1,2),
(60,'https://static.chus.vn/images/thumbnails/500/500/detailed/231/10642_09_F1.jpg','PROD002','Product description 2',15,1240000,'Trà Xanh Gạo','Product note 2',4.7,880000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả',120,2,2),
(45,'https://static.chus.vn/images/thumbnails/500/500/detailed/206/319edb1cb5f4a5252cf1e03f886fb66c_w767_h1105.jpg','PROD003','Product description 3',5,1250000,'Trà Giúp Ngủ Non','Product note 3',4,960000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả ghi dài thêm',90,1,1),
(50,'https://static.chus.vn/images/thumbnails/500/500/detailed/203/56ba5dd6c016723865e685bb069acd4c_w767_h1105.jpg','PROD001','Product description 1',10,155000,'Nến thơm Silva','Product note 1',4.5,120000,'Đây là mô tả sơ bộ cho Nến thơm Silva',100,1,1),
(60,'https://static.chus.vn/images/thumbnails/500/500/detailed/221/10561_01_F1.jpg','PROD002','Product description 2',15,2250000,'Nến Thơm Hương Quế','Product note 2',4.7,1920000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả ghi dài thêm',120,2,1),
(45,'https://static.chus.vn/images/thumbnails/500/500/detailed/209/1647352642_10287-03-f1_w767_h1105.jpg','PROD003','Product description 3',5,580000,'Nến Thơm Tinh Dầu Sả','Product note 3',4,485000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả',90,1,2),
(50,'https://static.chus.vn/images/thumbnails/500/500/detailed/262/msken_2.jpg','PROD001','Product description 1',10,755000,'Dầu Gội Thảo Mộc Silva','Product note 1',4.5,620000,'Đây là mô tả sơ bộ cho Nến thơm Silva',100,1,4),
(60,'https://static.chus.vn/images/thumbnails/500/500/detailed/209/1647352642_10287-03-f1_w767_h1105.jpg','PROD002','Product description 2',15,185000,'Mứt Xoài Cát Núm','Product note 2',4.7,135000,'Đây là mô tả sơ bộ cho Nến thơm hương quế',120,2,5),
(45,'https://static.chus.vn/images/thumbnails/500/500/detailed/221/10561_01_F1.jpg','PROD003','Product description 3',5,165000,'Nến Thơm Mùi Anh Yêu','Product note 3',4,125000,'Đây là mô tả sơ bộ cho Nến thơm tình dầu sả',90,1,3);

