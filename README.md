<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Shivpriya Silk Mills Portfolio

A modern portfolio website for textile agent services, showcasing suppliers and enabling AI-powered assistance.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file and set your Gemini API key:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```
   Get your API key from: https://aistudio.google.com/app/apikey

3. Run the app:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deploy to Vercel

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Fix deployment issues"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Add Environment Variable**:
   - In Vercel project settings, go to "Environment Variables"
   - Add a new variable:
     - **Name:** `VITE_API_KEY`
     - **Value:** Your Gemini API key
   - Make sure to add it for all environments (Production, Preview, Development)

4. **Deploy**:
   - Vercel will automatically deploy on every push to main
   - Or manually trigger a deployment from the Vercel dashboard

## Project Structure

- `App.tsx` - Main application component
- `components/` - React components
- `services/` - API services (Gemini AI integration)
- `constants.ts` - Application constants
- `types.ts` - TypeScript type definitions
