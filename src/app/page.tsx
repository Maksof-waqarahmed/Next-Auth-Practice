import NavBar from "@/components/navbar/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-[400px] p-4">
        <CardTitle>Cat Card</CardTitle>
        <CardContent className="flex items-center justify-center">
          <Image
            src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
            width={200}
            height={200}
            alt=""
          />
        </CardContent>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, modi, magnam quisquam rem veniam laborum enim iste quae sunt expedita eligendi esse ex ratione labore odit, harum ut iusto pariatur.
        </CardDescription>
      </Card>
    </div>
    </>
  );
}
