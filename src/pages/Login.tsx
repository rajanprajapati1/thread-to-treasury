
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { login, signup } from '@/services/localStorage';
import { useAuth } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

interface LoginErrors {
  general?: string;
  email?: string;
  password?: string;
}

interface SignupErrors {
  general?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ErrorState {
  login: LoginErrors;
  signup: SignupErrors;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<ErrorState>({
    login: {},
    signup: {}
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(prev => ({ ...prev, login: {} }));

    const newErrors: LoginErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, login: newErrors }));
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = login(loginData.email, loginData.password);

      if (user) {
        if (rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }
        refreshAuth();
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${user.name}!`
        });
        navigate('/');
      } else {
        setErrors(prev => ({ 
          ...prev, 
          login: { general: 'Invalid email or password' }
        }));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(prev => ({ ...prev, signup: {} }));

    const newErrors: SignupErrors = {};

    if (!signupData.name) {
      newErrors.name = 'Name is required';
    }

    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signupData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, signup: newErrors }));
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = signup(signupData.name, signupData.email, signupData.password);

      if (user) {
        refreshAuth();
        toast({
          title: 'Account Created!',
          description: `Welcome to Vasanti Textiles, ${user.name}!`
        });
        navigate('/');
      } else {
        setErrors(prev => ({ 
          ...prev, 
          signup: { email: 'This email is already registered' }
        }));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGuestCheckout = () => {
    localStorage.setItem('guestUser', 'true');
    navigate('/cart');
  };

  const handleRememberMeChange = (checked: boolean | "indeterminate") => {
    setRememberMe(checked === true);
  };

  return (
    <div className="min-h-screen bg-brand-warm-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-brand-charcoal">Welcome</h1>
            <p className="text-brand-charcoal/70 mt-2">Sign in to your account or create a new one</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {errors.login.general && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                        {errors.login.general}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label htmlFor="login-email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-brand-charcoal/40" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      {errors.login.email && (
                        <p className="text-sm text-red-600">{errors.login.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="login-password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-brand-charcoal/40" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.login.password && (
                        <p className="text-sm text-red-600">{errors.login.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={handleRememberMeChange}
                        />
                        <label htmlFor="remember" className="text-sm">Remember me</label>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Forgot password?
                      </Button>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                      />
                      {errors.signup.name && (
                        <p className="text-sm text-red-600">{errors.signup.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-brand-charcoal/40" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={signupData.email}
                          onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      {errors.signup.email && (
                        <p className="text-sm text-red-600">{errors.signup.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-brand-charcoal/40" />
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          value={signupData.password}
                          onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.signup.password && (
                        <p className="text-sm text-red-600">{errors.signup.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                      {errors.signup.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.signup.confirmPassword}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Guest Checkout Option */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-sage/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-brand-warm-white px-3 text-brand-charcoal/60">Or</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={handleGuestCheckout}
            >
              Continue as Guest
            </Button>
            <p className="text-xs text-center text-brand-charcoal/60 mt-2">
              You can create an account later during checkout
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
