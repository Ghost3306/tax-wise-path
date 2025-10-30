// "use client";

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/contexts/AuthContext';

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) navigate('/');
//   }, [user, navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Error",
//         description: "Passwords do not match",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast({
//         title: "Error",
//         description: "Password must be at least 6 characters",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: formData.name, // match Django backend
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         toast({
//           title: "Registration Failed",
//           description: data.error || "Failed to create account",
//           variant: "destructive",
//         });
//       } else {
//         toast({
//           title: "Registration Successful",
//           description: data.message || "Welcome! Check your email to verify your account.",
//         });
//         navigate("/login");
//       }
//     } catch (err: any) {
//       toast({
//         title: "Registration Failed",
//         description: err?.message || "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md animate-scale-in">
//         <div className="mb-6 text-center">
//           <Button 
//             variant="ghost" 
//             onClick={() => navigate('/')}
//             className="mb-4 text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Home
//           </Button>
//         </div>

//         <Card className="shadow-medium">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center justify-center mb-4">
//               <div className="p-3 bg-gradient-primary rounded-full">
//                 <UserPlus className="h-6 w-6 text-primary-foreground" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl text-center">Create account</CardTitle>
//             <CardDescription className="text-center">
//               Enter your information to create your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="transition-all focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="transition-all focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="pr-10 transition-all focus:ring-2 focus:ring-primary/20"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
//                   </Button>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                     className="pr-10 transition-all focus:ring-2 focus:ring-primary/20"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
//                   </Button>
//                 </div>
//               </div>
//               <Button 
//                 type="submit" 
//                 className="w-full bg-gradient-primary border-0 hover:opacity-90"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating account..." : "Create Account"}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter>
//             <div className="text-center text-sm text-muted-foreground w-full">
//               Already have an account?{' '}
//               <Link 
//                 to="/login" 
//                 className="text-primary hover:underline font-medium"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Register;

// "use client";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [message, setMessage] = useState("");

//   const validateForm = () => {
//     const newErrors: any = {};

//     // First name
//     if (!formData.first_name.trim()) {
//       newErrors.first_name = "First name is required";
//     } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
//       newErrors.first_name = "First name should only contain letters";
//     }

//     // Last name
//     if (!formData.last_name.trim()) {
//       newErrors.last_name = "Last name is required";
//     } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
//       newErrors.last_name = "Last name should only contain letters";
//     }

//     // Email
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
//     ) {
//       newErrors.email = "Invalid email format";
//     }

//     // Password
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//     } else if (!/[A-Z]/.test(formData.password)) {
//       newErrors.password = "Password must contain at least one uppercase letter";
//     } else if (!/[a-z]/.test(formData.password)) {
//       newErrors.password = "Password must contain at least one lowercase letter";
//     } else if (!/[0-9]/.test(formData.password)) {
//       newErrors.password = "Password must contain at least one digit";
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       newErrors.password = "Password must contain at least one special character";
//     }

//     // Confirm Password
//     if (!formData.confirm_password) {
//       newErrors.confirm_password = "Please confirm your password";
//     } else if (formData.confirm_password !== formData.password) {
//       newErrors.confirm_password = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear field error on input
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:8000/accounts/register/", formData);
      
//       if (res.status === 201) {
//         setMessage("Registration successful! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//       }
//     } catch (err: any) {
//       if (err.response?.data?.email) {
//         setErrors({ email: "Email already exists" });
//       } else {
//         setMessage("Registration failed. Try again later.");
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
//           Register
//         </h2>

//         {message && (
//           <div className="text-center text-sm text-green-600 mb-3">{message}</div>
//         )}

//         {/* First Name */}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">First Name</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.first_name ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.first_name && (
//             <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
//           )}
//         </div>

//         {/* Last Name */}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Last Name</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.last_name ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.last_name && (
//             <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.password ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-4">
//           <label className="block text-gray-600 mb-2">Confirm Password</label>
//           <input
//             type="password"
//             name="confirm_password"
//             value={formData.confirm_password}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.confirm_password ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.confirm_password && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.confirm_password}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
//         >
//           Register
//         </button>
//         <CardFooter>
//           <div className="text-center text-sm text-muted-foreground w-full">
//                Already have an account?{' '}
//                <Link 
//                 to="/login" 
//                 className="text-primary hover:underline font-medium"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </CardFooter>
//       </form>
      
//     </div>
    
//   );
// };

// export default Register;

"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // kept for reference; not used anymore

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors: any = {};

    // First name
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
      newErrors.first_name = "First name should only contain letters";
    }

    // Last name
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
      newErrors.last_name = "Last name should only contain letters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    // Confirm Password
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error on input
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // ✅ FIXED PART — convert formData to match Django's expected fields
      const payload = {
        username: `${formData.first_name.toLowerCase()}.${formData.last_name.toLowerCase()}`,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        if (data?.email) {
          setErrors({ email: "Email already exists" });
        } else if (data?.error) {
          setMessage(data.error);
        } else {
          setMessage("Registration failed. Try again later.");
        }
      }
    } catch (error) {
      setMessage("Registration failed. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register
        </h2>

        {message && (
          <div className="text-center text-sm text-green-600 mb-3">
            {message}
          </div>
        )}

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Register
        </button>

        {/* Footer with link to login */}
        <CardFooter>
          <div className="text-center text-sm text-muted-foreground w-full">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
};

export default Register;
