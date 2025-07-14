import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart, FileText, BrainCircuit, MessageSquare, Target } from "lucide-react";
import Link from "next/link";

const stats = [
    { title: "Completed Goals", value: "0", icon: <Target className="h-6 w-6 text-green-500" /> },
    { title: "Active Conversations", value: "0", icon: <MessageSquare className="h-6 w-6 text-blue-500" /> },
    { title: "Projects Enhanced", value: "0", icon: <FileText className="h-6 w-6 text-purple-500" /> },
    { title: "Assessments Taken", value: "0", icon: <BrainCircuit className="h-6 w-6 text-indigo-500" /> },
];

const actions = [
    { title: "Take AQ Assessment", description: "Understand your adaptability profile", icon: <BrainCircuit className="h-8 w-8 text-primary" />, href: "#" },
    { title: "Difficult Conversations", description: "Practice challenging discussions", icon: <MessageSquare className="h-8 w-8 text-green-500" />, href: "/coach/new" },
    { title: "Project Support", description: "Get personalized project insights", icon: <FileText className="h-8 w-8 text-purple-500" />, href: "#" },
    { title: "Set Development Goals", description: "Track your leadership growth", icon: <Target className="h-8 w-8 text-orange-500" />, href: "#" },
]

export default function CoachDashboardPage() {
    return (
        <div className="space-y-6">
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Upgrade to Adaptability Coach Premium</CardTitle>
                        <CardDescription>Get unlimited coaching sessions, personalized development, and more advanced features.</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="#">View Plans</Link>
                    </Button>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>What would you like to do?</CardTitle>
                    <CardDescription>Explore these key features to enhance your leadership skills</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {actions.map((action) => (
                           <Link href={action.href} key={action.title}>
                             <Card className="h-full transition-shadow hover:shadow-md">
                                 <CardContent className="flex items-center gap-4 p-4">
                                     <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                                         {action.icon}
                                     </div>
                                     <div>
                                         <p className="font-semibold">{action.title}</p>
                                         <p className="text-sm text-muted-foreground">{action.description}</p>
                                     </div>
                                 </CardContent>
                             </Card>
                           </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Assessments</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <p className="text-lg font-medium text-muted-foreground">No Assessments Yet</p>
                </CardContent>
            </Card>

        </div>
    );
}
