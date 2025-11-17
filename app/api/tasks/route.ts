// API Route: SEO Tasks Management
// GET/POST/PATCH /api/tasks

import { NextRequest, NextResponse } from 'next/server';
import {
  getActiveTasksThisWeek,
  getTasksByPageId,
  createTask,
  updateTask,
  getPendingAISuggestions,
} from '@/lib/db/operations';

export const runtime = 'nodejs';

/**
 * GET /api/tasks
 * Hämtar tasks (alla eller för specifik sida)
 * 
 * Query params:
 * - pageId?: number
 * - thisWeek?: boolean
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageId = searchParams.get('pageId');
    const thisWeek = searchParams.get('thisWeek') === 'true';

    let tasks;
    
    if (pageId) {
      tasks = await getTasksByPageId(parseInt(pageId));
    } else if (thisWeek) {
      tasks = await getActiveTasksThisWeek();
    } else {
      // Returnera denna veckans tasks som default
      tasks = await getActiveTasksThisWeek();
    }

    return NextResponse.json({
      success: true,
      tasks,
    });

  } catch (error) {
    console.error('[API Tasks] GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Skapar en ny task
 * 
 * Body:
 * {
 *   page_id: number,
 *   suggestion_id?: number,
 *   title: string,
 *   description?: string,
 *   task_type?: string,
 *   priority?: 'high' | 'medium' | 'low',
 *   expected_impact?: string,
 *   effort_estimate?: 'small' | 'medium' | 'large',
 *   assigned_to?: string,
 *   due_date?: string,
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      page_id,
      suggestion_id,
      title,
      description,
      task_type,
      priority = 'medium',
      expected_impact,
      effort_estimate = 'small',
      assigned_to,
      due_date,
      ai_generated = false,
    } = body;

    // Validera required fields
    if (!page_id || !title) {
      return NextResponse.json(
        { error: 'page_id och title krävs', success: false },
        { status: 400 }
      );
    }

    const taskId = await createTask({
      page_id,
      suggestion_id,
      title,
      description,
      task_type,
      priority,
      expected_impact,
      effort_estimate,
      assigned_to,
      due_date,
      ai_generated,
      status: 'todo',
    });

    return NextResponse.json({
      success: true,
      taskId,
    });

  } catch (error) {
    console.error('[API Tasks] POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tasks
 * Uppdaterar en task
 * 
 * Body:
 * {
 *   taskId: number,
 *   status?: string,
 *   assigned_to?: string,
 *   notes?: string,
 *   completed_by?: string,
 * }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, status, assigned_to, notes, completed_by } = body;

    if (!taskId) {
      return NextResponse.json(
        { error: 'taskId krävs', success: false },
        { status: 400 }
      );
    }

    const update: any = {};
    if (status) update.status = status;
    if (assigned_to !== undefined) update.assigned_to = assigned_to;
    if (notes !== undefined) update.notes = notes;
    if (completed_by !== undefined) update.completed_by = completed_by;

    // Auto-sätt completed_at om status blir 'done'
    if (status === 'done') {
      update.completed_at = new Date().toISOString();
    }

    await updateTask(taskId, update);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error('[API Tasks] PATCH error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
