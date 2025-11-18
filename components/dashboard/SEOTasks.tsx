// SEO Tasks Component

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: number;
  title: string;
  description?: string;
  task_type?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done' | 'skipped';
  expected_impact?: string;
  effort_estimate?: string;
  page_url?: string;
  last_score?: number;
  ai_generated: boolean;
  created_at: string;
  due_date?: string;
}

export function SEOTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('todo');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/tasks?thisWeek=true');
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status: newStatus }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Uppdatera lokal state
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus as any } : task
        ));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'skipped':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{taskCounts.all}</div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{taskCounts.todo}</div>
            <p className="text-sm text-muted-foreground">To Do</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{taskCounts.in_progress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{taskCounts.done}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📋</span> SEO Tasks
          </CardTitle>
          <CardDescription>
            This week's prioritized tasks and improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
          ) : (
            <>
              <Tabs defaultValue="todo" onValueChange={(v) => setFilter(v as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({taskCounts.all})</TabsTrigger>
                  <TabsTrigger value="todo">To Do ({taskCounts.todo})</TabsTrigger>
                  <TabsTrigger value="in_progress">Active ({taskCounts.in_progress})</TabsTrigger>
                  <TabsTrigger value="done">Done ({taskCounts.done})</TabsTrigger>
                </TabsList>

              <div className="mt-6 space-y-3">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No tasks {filter !== 'all' && `with status "${filter}"`}
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md hover:border-primary/50 transition-all">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            {task.task_type && (
                              <Badge variant="outline">{task.task_type}</Badge>
                            )}
                            {task.ai_generated && (
                              <Badge variant="secondary">🤖 AI</Badge>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-1">{task.title}</h4>
                        
                        {task.page_url && (
                          <div className="text-sm text-gray-600 mb-2">
                            📄 {task.page_url}
                            {task.last_score !== undefined && (
                              <span className="ml-2">
                                (Score: {task.last_score})
                              </span>
                            )}
                          </div>
                        )}

                        {task.description && (
                          <p className="text-sm text-gray-600 mb-2">
                            {task.description}
                          </p>
                        )}

                        {task.expected_impact && (
                          <div className="text-sm mb-3">
                            <span className="font-medium">Förväntad effekt:</span>{' '}
                            <span className="text-green-600">{task.expected_impact}</span>
                          </div>
                        )}

                        <div className="flex gap-2 mt-3">
                          {task.status === 'todo' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateTaskStatus(task.id, 'in_progress')}
                            >
                              Starta
                            </Button>
                          )}
                          {task.status === 'in_progress' && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => updateTaskStatus(task.id, 'done')}
                            >
                              Markera klar
                            </Button>
                          )}
                          {task.status !== 'done' && task.status !== 'skipped' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateTaskStatus(task.id, 'skipped')}
                            >
                              Hoppa över
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
