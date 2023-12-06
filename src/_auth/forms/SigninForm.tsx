import {SigninValidation } from "@/lib/validation"
import { Link , useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import Loader from "@/components/shared/Loader"
import { useSignInAccountMutation} from '@/lib/react-query/queriesAndMutation'
import { useUserContext } from "../context/AuthContext"


const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser , isLoading: isUserLoading} = useUserContext();

  const navigate = useNavigate();
  const {mutateAsync: signInAccount  } = useSignInAccountMutation();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
      resolver: zodResolver(SigninValidation),
      defaultValues: {
        email: '',
        password: '',
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninValidation>) {
      

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      })
      
      if(!session) {
        return toast({title: "Sign in failed. Please try again."})
      }

      const isLoggedIn = await checkAuthUser();



      if(isLoggedIn) {
        form.reset();
        navigate('/')
      } else {
        toast({title: 'Sign up failed. Please try again'})
      }
    }
  return (

    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="small-medium md:base-regular text-light-3">Welcome back fill your details</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-1/2 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                type = "email"
                placeholder="One correct email please"
                className="shad-input"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                type = "password"
                className="shad-input"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? 
          (<div className="flex-center gap-2">
            <Loader/>Loading...
          </div>):
          "Sign in"  
          }
        </Button>
        <p className="text-light-2 text-center mt-2 text-small-regular">
          Don't have an account 
          <Link to="/sign-up" className="text-primary-500 text-small-semibold m-1">Sign up</Link>
        </p>

      </form>
    </Form>

  )
}

export default SigninForm