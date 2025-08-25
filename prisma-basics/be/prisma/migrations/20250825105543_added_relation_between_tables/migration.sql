-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
