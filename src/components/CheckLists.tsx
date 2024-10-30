import {currentUser} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {List} from "@prisma/client";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@components/ui/card";
import {cn} from "@/lib/utils";
import {ListMap} from "@/lib/const";
import CheckListFooter from "@components/CheckListFooter";

interface Props {
    checkList: List;
}

function CheckList({ checkList }: Props) {
    const { name, color } = checkList;

    return (
        <Card
            className={cn("w-full text-white sm:col-span-2", ListMap.get(color))}
            x-chunk="dashboard-05-chunk-0"
        >
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>任务列表</p>
            </CardContent>
            <CardFooter className="flex-col pb-2">
                <CheckListFooter checkList={checkList} />
            </CardFooter>
        </Card>
    );
}

export async function CheckLists() {
   const user = await currentUser();
   const checkLists = await prisma.list.findMany({
       where: {
           userId: user?.id,
       },
   })

   if (checkLists.length === 0) {
         return (
              <div className="w-full h-[180px] flex items-center justify-center">
                <p className="text-sm text-gray-400">暂无清单</p>
              </div>
         )
   }

   return (
       <>
           <div className="mt-6 flex w-full flex-col gap-4">
               {
                   checkLists.map((list) => (
                       <CheckList key={list.id} checkList={list} />
                   ))
               }
           </div>
       </>
   )
}
