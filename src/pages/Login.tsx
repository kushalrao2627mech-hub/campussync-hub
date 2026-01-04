import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, UserCircle, BookOpen } from 'lucide-react';
import { UserRole } from '@/types/attendance';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && name.trim()) {
      login(selectedRole, name.trim());
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
            <GraduationCap className="h-8 w-8 text-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">CampusSync</h1>
          <p className="text-muted-foreground mt-1">Select your role to continue</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedRole('teacher')}
            className={`
              p-6 rounded-lg border-2 transition-all text-center
              ${selectedRole === 'teacher' 
                ? 'border-success bg-success/10' 
                : 'border-border hover:border-muted-foreground/50'
              }
            `}
          >
            <BookOpen className={`h-8 w-8 mx-auto mb-2 ${selectedRole === 'teacher' ? 'text-success' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${selectedRole === 'teacher' ? 'text-success' : ''}`}>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`
              p-6 rounded-lg border-2 transition-all text-center
              ${selectedRole === 'student' 
                ? 'border-success bg-success/10' 
                : 'border-border hover:border-muted-foreground/50'
              }
            `}
          >
            <UserCircle className={`h-8 w-8 mx-auto mb-2 ${selectedRole === 'student' ? 'text-success' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${selectedRole === 'student' ? 'text-success' : ''}`}>Student</span>
          </button>
        </div>

        {/* Name Input */}
        {selectedRole && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Enter your name</CardTitle>
              <CardDescription>
                {selectedRole === 'teacher' 
                  ? 'You can start attendance sessions and manage curriculum' 
                  : 'You can mark attendance and view your schedule'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder={selectedRole === 'teacher' ? 'Dr. John Smith' : 'Jane Doe'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  disabled={!name.trim()}
                >
                  Continue as {selectedRole === 'teacher' ? 'Teacher' : 'Student'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
