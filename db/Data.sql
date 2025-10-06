--
-- PostgreSQL database dump
--

\restrict DgyTRR7pkUgFCfgkNQpAunvFBdDoWzX2FiDTjwHFzhAZgx1S98H375NNJPcBsVg

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-09-30 06:16:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16404)
-- Name: examples; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.examples (
    id integer NOT NULL,
    xl double precision NOT NULL,
    xr double precision NOT NULL,
    fx character varying(255) NOT NULL,
    et double precision NOT NULL
);


ALTER TABLE public.examples OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16403)
-- Name: examples_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.examples_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.examples_id_seq OWNER TO postgres;

--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 219
-- Name: examples_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.examples_id_seq OWNED BY public.examples.id;


--
-- TOC entry 4856 (class 2604 OID 16407)
-- Name: examples id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.examples ALTER COLUMN id SET DEFAULT nextval('public.examples_id_seq'::regclass);


--
-- TOC entry 5007 (class 0 OID 16404)
-- Dependencies: 220
-- Data for Name: examples; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.examples (id, xl, xr, fx, et) FROM stdin;
1	1	10	x^4-13	1e-06
2	-5	5	x^3 + x - 1	1e-06
\.


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 219
-- Name: examples_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.examples_id_seq', 2, true);


--
-- TOC entry 4858 (class 2606 OID 16414)
-- Name: examples examples_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.examples
    ADD CONSTRAINT examples_pkey PRIMARY KEY (id);


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE examples; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.examples TO numerbackend;


-- Completed on 2025-09-30 06:16:40

--
-- PostgreSQL database dump complete
--

\unrestrict DgyTRR7pkUgFCfgkNQpAunvFBdDoWzX2FiDTjwHFzhAZgx1S98H375NNJPcBsVg

