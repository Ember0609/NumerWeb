-- db/Data.sql

-- ลบตารางเก่าทิ้ง (ถ้ามี) เพื่อเริ่มต้นใหม่
DROP TABLE IF EXISTS public.examples;

-- สร้างตารางเดียวที่ใช้เก็บโจทย์ทุกประเภท
CREATE TABLE public.examples (
    id SERIAL PRIMARY KEY,
    problem_type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL
);

ALTER TABLE public.examples OWNER TO postgres;

-- ใส่ข้อมูลตัวอย่างทั้งหมดลงในตารางเดียว
INSERT INTO public.examples (problem_type, data) VALUES
('bisection', '{"xl": 1, "xr": 10, "fx": "x^4-13", "et": 0.000001}'),
('bisection', '{"xl": -5, "xr": 5, "fx": "x^3 + x - 1", "et": 0.000001}'),
('onepoint', '{"xin": 1.5, "fx": "(x^2 + 3) / (2*x)", "et": 0.000001}'),
('onepoint', '{"xin": 0, "fx": "cos(x)", "et": 0.000001}'),
('secent', '{"x0": 2, "x1": 3, "fx": "x^3 - x - 2", "et": 0.000001}'),
('secent', '{"x0": 0, "x1": 1, "fx": "x^2 - 2", "et": 0.000001}'),
('matrix', '{"matrix_a": [[-2, 3, 1], [3, 4, -5], [1, -2, 1]], "vector_b": [9, 0, -4]}'),
('matrix', '{"matrix_a": [[4, 1, -1], [2, 5, 2], [1, 2, 4]], "vector_b": [5, -4, 3]}');

-- ให้สิทธิ์กับ user ของ backend
GRANT ALL ON TABLE public.examples TO numerbackend;