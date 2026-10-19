-- Public browser access for the unauthenticated POS page.
-- Anyone with access to the site can read and modify data allowed below.

ALTER TABLE public.pos_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_void_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_stock_logs ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pos_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pos_sales TO anon;
GRANT SELECT, INSERT, UPDATE ON public.pos_void_sales TO anon;
GRANT SELECT, INSERT ON public.pos_stock_logs TO anon;

DROP POLICY IF EXISTS "Public POS products select" ON public.pos_products;
CREATE POLICY "Public POS products select"
  ON public.pos_products FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Public POS products insert" ON public.pos_products;
CREATE POLICY "Public POS products insert"
  ON public.pos_products FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Public POS products update" ON public.pos_products;
CREATE POLICY "Public POS products update"
  ON public.pos_products FOR UPDATE TO anon USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public POS products delete" ON public.pos_products;
CREATE POLICY "Public POS products delete"
  ON public.pos_products FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Public POS sales select" ON public.pos_sales;
CREATE POLICY "Public POS sales select"
  ON public.pos_sales FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Public POS sales insert" ON public.pos_sales;
CREATE POLICY "Public POS sales insert"
  ON public.pos_sales FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Public POS sales update" ON public.pos_sales;
CREATE POLICY "Public POS sales update"
  ON public.pos_sales FOR UPDATE TO anon USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public POS sales delete" ON public.pos_sales;
CREATE POLICY "Public POS sales delete"
  ON public.pos_sales FOR DELETE TO anon USING (true);

DROP POLICY IF EXISTS "Public POS void sales select" ON public.pos_void_sales;
CREATE POLICY "Public POS void sales select"
  ON public.pos_void_sales FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Public POS void sales insert" ON public.pos_void_sales;
CREATE POLICY "Public POS void sales insert"
  ON public.pos_void_sales FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Public POS void sales update" ON public.pos_void_sales;
CREATE POLICY "Public POS void sales update"
  ON public.pos_void_sales FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public POS stock logs select" ON public.pos_stock_logs;
CREATE POLICY "Public POS stock logs select"
  ON public.pos_stock_logs FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Public POS stock logs insert" ON public.pos_stock_logs;
CREATE POLICY "Public POS stock logs insert"
  ON public.pos_stock_logs FOR INSERT TO anon WITH CHECK (true);
