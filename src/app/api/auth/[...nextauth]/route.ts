import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/dashbaord", // on successfully signin
    signOut: "/auth/login", // on signout redirects users to a custom login page.
    error: "/auth/error", // displays authentication errors
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("user", user);
      // console.log("account", account);
      // console.log("profile", profile);

      const response = await fetch(
        "http://localhost:3000/api/auth/userExists",
        {
          method: "POST",
          body: JSON.stringify({ email: user?.email }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "서버 요청에 실패함");
      }

      if (data.value === true) {
        return true;
      } else {
        const data = {
          username: user?.name,
          email: user?.email,
          profileImageUrl: user?.image,
        };
        await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(data),
        });
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
