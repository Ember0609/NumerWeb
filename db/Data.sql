-- db/Data.sql

-- ลบตารางเก่าทิ้ง (ถ้ามี) เพื่อเริ่มต้นใหม่
DROP TABLE IF EXISTS public.examples;

-- สร้างตารางเดียวที่ใช้เก็บโจทย์ทุกประเภท
CREATE TABLE public.examples (
    id SERIAL PRIMARY KEY,
    problem_type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL
);

ALTER TABLE public.examples OWNER TO numerbackend;

-- ใส่ข้อมูลตัวอย่างทั้งหมดลงในตารางเดียว
INSERT INTO public.examples (problem_type, data) VALUES
-- Bisection & False Position (6 โจทย์)
('bisection', '{"xl": 1, "xr": 2, "fx": "x^3 - x - 1", "et": 0.00001}'),
('bisection', '{"xl": 0, "xr": 1, "fx": "exp(-x) - x", "et": 0.00001}'),
('bisection', '{"xl": -10, "xr": 10, "fx": "x^2 - 13", "et": 0.00001}'),
('bisection', '{"xl": 2, "xr": 3, "fx": "log(x) - 1", "et": 0.00001}'),
('bisection', '{"xl": 0.1, "xr": 1, "fx": "sin(x) - 0.5", "et": 0.00001}'),
('bisection', '{"xl": -2, "xr": 0, "fx": "x^3 + 4*x^2 - 10", "et": 0.00001}'),

-- One-Point Iteration (6 โจทย์)
('onepoint', '{"xin": 1, "fx": "1 / (x + 1)", "et": 0.00001}'),
('onepoint', '{"xin": 0.5, "fx": "exp(-x)", "et": 0.00001}'),
('onepoint', '{"xin": 3, "fx": "sqrt(13)", "et": 0.00001}'),
('onepoint', '{"xin": 1, "fx": "cbrt(x+1)", "et": 0.00001}'),
('onepoint', '{"xin": 0.8, "fx": "(2*x^3 + 2) / (3*x^2 - 1)", "et": 0.00001}'),
('onepoint', '{"xin": 2, "fx": "log(7/x)", "et": 0.00001}'),

-- Secant Method (6 โจทย์)
('secent', '{"x0": 1, "x1": 2, "fx": "x^3 - 2*x - 5", "et": 0.00001}'),
('secent', '{"x0": 0, "x1": 1, "fx": "cos(x) - x", "et": 0.00001}'),
('secent', '{"x0": 4, "x1": 5, "fx": "x^2 - 17", "et": 0.00001}'),
('secent', '{"x0": -1, "x1": 0, "fx": "exp(x) - 1", "et": 0.00001}'),
('secent', '{"x0": 0.5, "x1": 1, "fx": "x*log10(x) - 1.2", "et": 0.00001}'),
('secent', '{"x0": 2, "x1": 2.5, "fx": "x^3 - 10", "et": 0.00001}'),

-- Matrix (โจทย์ทั่วไป, 6 โจทย์)
('matrix', '{"matrix_a": [[2, 1], [-1, 3]], "vector_b": [8, 7]}'),
('matrix', '{"matrix_a": [[1, -2, 3], [2, 1, 1], [-3, 2, -2]], "vector_b": [7, 4, -10]}'),
('matrix', '{"matrix_a": [[10, -1, 2, 0], [-1, 11, -1, 3], [2, -1, 10, -1], [0, 3, -1, 8]], "vector_b": [6, 25, -11, 15]}'),
('matrix', '{"matrix_a": [[1, 1, 1], [0, 2, 5], [2, 5, -1]], "vector_b": [6, -4, 27]}'),
('matrix', '{"matrix_a": [[5, -2, 3], [-3, 9, 1], [2, -1, -7]], "vector_b": [-1, 2, 3]}'),
('matrix', '{"matrix_a": [[1, 2], [3, 4]], "vector_b": [5, 6]}'),

-- Matrix Symmetric (โจทย์เมทริกซ์สมมาตร, 6 โจทย์)
('matrix_symmetric', '{"matrix_a": [[4, 2], [2, 5]], "vector_b": [6, 3], "x_init": [0, 0]}'),
('matrix_symmetric', '{"matrix_a": [[5, 2, 1], [2, 3, 1], [1, 1, 2]], "vector_b": [1, 2, 3], "x_init": [0, 0, 0]}'),
('matrix_symmetric', '{"matrix_a": [[9, -3, 3], [-3, 5, -1], [3, -1, 2]], "vector_b": [9, 7, 8], "x_init": [0, 0, 0]}'),
('matrix_symmetric', '{"matrix_a": [[25, 15, -5], [15, 18, 0], [-5, 0, 11]], "vector_b": [35, 33, 6], "x_init": [0, 0, 0]}'),
('matrix_symmetric', '{"matrix_a": [[4, 12, -16], [12, 37, -43], [-16, -43, 98]], "vector_b": [1, 2, 3], "x_init": [0, 0, 0]}'),
('matrix_symmetric', '{"matrix_a": [[1, 0, 0], [0, 2, 0], [0, 0, 3]], "vector_b": [1, 4, 9], "x_init": [0, 0, 0]}'),

-- Integration (Trapezoidal, Simpson) (6 โจทย์)
('integration', '{"a": 0, "b": 1, "fx": "exp(x^2)"}'),
('integration', '{"a": 1, "b": 2, "fx": "1/x"}'),
('integration', '{"a": 0, "b": 3.14159, "fx": "sin(x)"}'),
('integration', '{"a": -1, "b": 1, "fx": "x^3 + 2*x^2 - x + 2"}'),
('integration', '{"a": 0, "b": 2, "fx": "sqrt(1 + x^4)"}'),
('integration', '{"a": 1, "b": 5, "fx": "log(x)"}'),

-- Integration with N (Composite Methods) (6 โจทย์)
('integration_n', '{"a": 0, "b": 4, "fx": "x*exp(2*x)", "n": 8}'),
('integration_n', '{"a": 0, "b": 1, "fx": "1/(1+x^2)", "n": 4}'),
('integration_n', '{"a": 2, "b": 5, "fx": "x^2*log(x)", "n": 6}'),
('integration_n', '{"a": -2, "b": 2, "fx": "exp(-x^2/2)", "n": 10}'),
('integration_n', '{"a": 0, "b": 3.14159, "fx": "sqrt(1 + (cos(x))^2)", "n": 6}'),
('integration_n', '{"a": 1, "b": 3, "fx": "x^2 / (1+x^3)", "n": 4}'),

-- Interpolation (Lagrange, Newton Divided) (6 โจทย์)
('interpolation', '{"points": [{"x": 1, "y": 0}, {"x": 4, "y": 1.386294}, {"x": 6, "y": 1.791759}], "xValue": 2}'),
('interpolation', '{"points": [{"x": 0, "y": 1}, {"x": 1, "y": 2.71828}, {"x": 2, "y": 7.38906}], "xValue": 1.5}'),
('interpolation', '{"points": [{"x": -1, "y": -8}, {"x": 0, "y": -1}, {"x": 2, "y": 1}], "xValue": 1}'),
('interpolation', '{"points": [{"x": 8, "y": 2.07944}, {"x": 9, "y": 2.19722}, {"x": 9.5, "y": 2.25129}], "xValue": 9.2}'),
('interpolation', '{"points": [{"x": 0, "y": 0}, {"x": 0.5, "y": 0.4794}, {"x": 1, "y": 0.8415}], "xValue": 0.25}'),
('interpolation', '{"points": [{"x": 1, "y": 1}, {"x": 2, "y": 8}, {"x": 3, "y": 27}, {"x": 4, "y": 64}], "xValue": 2.5}'),

-- Differentiation (Divided Difference) (6 โจทย์)
('differentiation', '{"fx": "x^3 - 2*x + 2", "x": 1.5, "h": 0.1}'),
('differentiation', '{"fx": "sin(x)", "x": 0.785398, "h": 0.01}'),
('differentiation', '{"fx": "exp(x) / x^2", "x": 2, "h": 0.05}'),
('differentiation', '{"fx": "log(x^2 + 1)", "x": 1, "h": 0.2}'),
('differentiation', '{"fx": "tan(x)", "x": 0, "h": 0.001}'),
('differentiation', '{"fx": "1 / (1 + exp(-x))", "x": 0.5, "h": 0.1}'),

-- Regression (Polynomial & Multiple) (2 ประเภท x 3 โจทย์)
('regression_poly', '{"points": [{"x": [0], "y": 1}, {"x": [1], "y": 6}, {"x": [2], "y": 17}, {"x": [3], "y": 34}], "xToPredict": [2.5], "order": 2}'),
('regression_poly', '{"points": [{"x": [1], "y": 4.5}, {"x": [2], "y": 10.5}, {"x": [4], "y": 40.5}, {"x": [5], "y": 70.5}], "xToPredict": [3], "order": 2}'),
('regression_poly', '{"points": [{"x": [10], "y": 25}, {"x": [15], "y": 22}, {"x": [20], "y": 21}, {"x": [25], "y": 21}, {"x": [30], "y": 22}, {"x": [35], "y": 25}], "xToPredict": [22], "order": 2}'),
('regression_multi', '{"points": [{"x": [1, 2], "y": 15}, {"x": [2, 3], "y": 25}, {"x": [3, 4], "y": 33}, {"x": [4, 5], "y": 45}], "xToPredict": [2.5, 3.5]}'),
('regression_multi', '{"points": [{"x": [0, 0], "y": 1}, {"x": [0, 1], "y": 3}, {"x": [1, 0], "y": 2}, {"x": [1, 1], "y": 4}], "xToPredict": [0.5, 0.5]}'),
('regression_multi', '{"points": [{"x": [8, 1], "y": 9}, {"x": [9, 2], "y": 8}, {"x": [10, 3], "y": 10}, {"x": [11, 4], "y": 9}, {"x": [12, 5], "y": 11}], "xToPredict": [9.5, 2.5]}');

-- ให้สิทธิ์กับ user ของ backend
GRANT ALL ON TABLE public.examples TO numerbackend;