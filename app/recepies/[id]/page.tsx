// Codes by mahdi tasha
// Importing part
// Forcing next.js to rende this page as client side
"use client";

import Header from "@/component/header";
import Recpie from "@/component/recepie";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { axiosInstance } from "@/lib/axios";
import { Recipe } from "@/type/general";
import { useQuery } from "@tanstack/react-query";
import {
   Clock,
   ForkKnifeCrossedIcon,
   Hamburger,
   Loader2,
   MessageCircle,
   Pizza,
   SproutIcon,
   Star,
   Tag,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Creating and exporting SingleRecepiePage as default
export default function SingleRecepiePage() {
   // Defining hooks
   const params = useParams<{ id: string }>();
   const recepie = useQuery<Recipe>({
      queryKey: ["recepies", params.id],
      queryFn: async () => {
         const data = await axiosInstance.get(`/recipes/${params.id}`);

         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <main>
               {recepie.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : recepie.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the recepie.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => recepie.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !recepie.isPending && !recepie.isError && recepie.data ? (
                  <>
                     <div className="relative z-0 overflow-hidden rounded-lg bg-red-500 mb-10">
                        <Image
                           alt={recepie.data.name}
                           src={recepie.data.image}
                           width={500}
                           height={500}
                           className="w-full h-[300px] object-cover rounded-none z-0"
                        />
                        <div className="z-20 p-4 absolute left-0 top-0 w-full">
                           <div className="flex items-start justify-between gap-2 w-full">
                              <div className="flex flex-wrap items-center justify-start gap-1">
                                 {recepie.data.mealType.map((item, index) => (
                                    <Badge key={index}>
                                       <Pizza />
                                       {item}
                                    </Badge>
                                 ))}
                                 <Badge className="shrink-0">
                                    <Clock />
                                    {`${recepie.data.prepTimeMinutes + recepie.data.cookTimeMinutes} Minutes`}
                                 </Badge>
                                 <Badge className="shrink-0">
                                    <ForkKnifeCrossedIcon />
                                    {recepie.data.cuisine}
                                 </Badge>
                                 <Badge className="shrink-0">
                                    <SproutIcon />
                                    {recepie.data.difficulty}
                                 </Badge>
                                 <Badge className="shrink-0">
                                    <Hamburger />
                                    {`${recepie.data.caloriesPerServing} Kcal`}
                                 </Badge>
                              </div>
                              <div className="flex items-center justify-start gap-1 shrink-0">
                                 <Badge>
                                    <Star className="fill-current stroke-current" />
                                    {recepie.data.rating}
                                 </Badge>
                                 <Badge>
                                    <MessageCircle />
                                    {recepie.data.reviewCount}
                                 </Badge>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="prose prose-neutral dark:prose-invert w-full max-w-full">
                        <h1>{recepie.data.name}</h1>
                        <h3>Ingredients</h3>
                        <ul>
                           {recepie.data.ingredients.map((item, index) => (
                              <li key={index}>{item}</li>
                           ))}
                        </ul>
                        <h3>Instructions</h3>
                        <ol>
                           {recepie.data.instructions.map((item, index) => (
                              <li key={index}>{item}</li>
                           ))}
                        </ol>
                        <hr />
                        <div className="flex flex-wrap gap-2">
                           {recepie.data.tags.map((item, index) => (
                              <Badge key={index}>
                                 <Tag />
                                 {item}
                              </Badge>
                           ))}
                        </div>
                     </div>
                  </>
               ) : (
                  false
               )}
            </main>
         </section>
      </>
   );
}
