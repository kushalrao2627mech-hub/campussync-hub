import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Download, CheckCircle2, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getChapters, updateTopicCompletion, SyllabusTopic } from '@/data/physics-syllabus';
import { useToast } from '@/hooks/use-toast';

export default function Curriculum() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chapters, setChapters] = useState(getChapters());
  const isTeacher = user?.role === 'teacher';

  useEffect(() => {
    const handleUpdate = () => {
      setChapters(getChapters());
    };
    window.addEventListener('syllabus-update', handleUpdate);
    return () => window.removeEventListener('syllabus-update', handleUpdate);
  }, []);

  const handleTopicToggle = (topicId: string, currentCompleted: boolean) => {
    updateTopicCompletion(topicId, !currentCompleted);
    setChapters(getChapters());
    
    if (!currentCompleted) {
      toast({
        title: 'Topic Completed',
        description: 'Students have been notified and assignment is now available.',
      });
    }
  };

  const completedCount = chapters.reduce(
    (acc, ch) => acc + ch.topics.filter(t => t.completed).length, 
    0
  );
  const totalCount = chapters.reduce((acc, ch) => acc + ch.topics.length, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {isTeacher ? 'Curriculum Management' : 'Class 12 Physics Syllabus'}
            </h1>
            <p className="text-muted-foreground">
              {isTeacher 
                ? 'Mark topics as completed to notify students and release assignments.' 
                : 'Track your course progress and download assignments.'
              }
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {completedCount}/{totalCount} completed
          </Badge>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-accent rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Chapters Accordion */}
        <Accordion type="multiple" defaultValue={['1']} className="space-y-4">
          {chapters.map((chapter) => {
            const chapterCompleted = chapter.topics.filter(t => t.completed).length;
            
            return (
              <AccordionItem 
                key={chapter.chapter} 
                value={String(chapter.chapter)}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-sm font-mono">
                      {chapter.chapter}
                    </span>
                    <div>
                      <h3 className="font-medium">{chapter.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chapterCompleted}/{chapter.topics.length} topics
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-2 pl-11">
                    {chapter.topics.map((topic) => (
                      <TopicRow 
                        key={topic.id} 
                        topic={topic} 
                        isTeacher={isTeacher}
                        onToggle={handleTopicToggle}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </DashboardLayout>
  );
}

interface TopicRowProps {
  topic: SyllabusTopic;
  isTeacher: boolean;
  onToggle: (topicId: string, currentCompleted: boolean) => void;
}

function TopicRow({ topic, isTeacher, onToggle }: TopicRowProps) {
  return (
    <div className={`
      flex items-center justify-between p-3 rounded-lg border
      ${topic.completed ? 'bg-success/5 border-success/20' : 'border-border'}
    `}>
      <div className="flex items-center gap-3">
        {isTeacher ? (
          <Checkbox 
            checked={topic.completed}
            onCheckedChange={() => onToggle(topic.id, topic.completed)}
            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
        ) : (
          topic.completed ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
          )
        )}
        <span className={topic.completed ? 'text-foreground' : 'text-muted-foreground'}>
          {topic.topic}
        </span>
      </div>
      
      {topic.completed && topic.assignmentUrl && (
        <Button variant="ghost" size="sm" className="gap-2 text-success hover:text-success">
          <Download className="h-4 w-4" />
          Assignment
        </Button>
      )}
      
      {!topic.completed && isTeacher && (
        <Badge variant="outline" className="text-xs">
          <Bell className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )}
    </div>
  );
}
