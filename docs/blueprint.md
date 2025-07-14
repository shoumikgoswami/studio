# **App Name**: AdaptAI Coach

## Core Features:

- AI Coaching Engine: Personalized Coaching Responses: LLM analyzes user data (AQ assessments, goals) and coach personality settings to generate contextually relevant and tailored coaching guidance via a chat-based interface. Uses prompt detailed with response_json_schema for structured outputs, and the history of the conversation, AQ data, goals and persona settings as context. Operates as a tool to enhance personalization by intelligently deciding when and how to use the contextual user information.
- Chat UI: Conversation Interface:  Displays the conversation history, an input field for user messages, and message editing capabilities within the coaching page.
- Personality Customization: Coach Personality Settings: Sliders and toggles (formality, tone, humor, etc.) for users to customize the AI coach's personality. Presets for coach settings saved in Supabase.
- Centralized Dashboard: Dashboard Integration:  Provides access to key functionalities like Adaptability Assessment tracking, goal setting/tracking, and the AI-powered coaching feature.
- Secure Authentication: Securely authenticate users, handling login and basic user data management, leveraging Supabase's authentication flows (e.g., email/password, OAuth).
- Supabase Integration: Data Persistence:  Store all data in Supabase tables (e.g., users, goals, coaching_conversations), utilizing Supabase's Row Level Security (RLS) for user-specific data access.

## Style Guidelines:

- Primary color: HSL(195, 75%, 50%) translated to RGB Hex #20A39E to invoke feelings of trust, intelligence, and adaptability.
- Background color: Desaturated version of the primary color: HSL(195, 20%, 90%) translated to RGB Hex #E3F0EF.
- Accent color: Analogous to the primary hue (approximately 30 degrees away): HSL(165, 65%, 65%) translated to RGB Hex #74D680 for balance, nature, growth.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text to maintain a modern, tech-forward yet readable design.
- Code Font: 'Source Code Pro' (monospace) for display of system code.
- Lucide React Icons: Maintain consistent style across the application.
- Responsive Layout: Implement a two-column responsive layout using Tailwind CSS, adapting to various screen sizes and devices for optimal user experience.
- The page should adopt a two-column layout, common for chat applications, optimized for both desktop and mobile.
- Desktop View: Left Column (Sidebar): Approximately 250-300px wide, dedicated to conversation history and management. Right Column (Main Content): Expands to fill the remaining width, dedicated to the active chat interface.
- Mobile View: The sidebar should be hidden by default and appear as a slide-out drawer or overlay when a hamburger menu icon (in the main content header) is tapped. The main content area should take up the full screen width.
- Action Button: "Coach Settings" button (outline style) on the right, with a Settings icon. This button should navigate to a separate settings page for coach persona customization.
- Container: A Card component with border-0 shadow-sm for a clean look, filling the full height of the column.
- New Conversation Button: A small Button with a PlusCircle icon, placed at the top right of the sidebar header, allowing quick creation of a new session.
- Scrollable Area: Use ScrollArea component to allow scrolling if many conversations are present.
- Conversation Items: Each item represents a CoachingConversation and should display Title: Bold, truncated if too long. Last Updated Date: Smaller, lighter text (e.g., "Apr 30"). Focus Area (Optional): A brief description of the conversation's focus, if set. Active State: The currently selected conversation should have a distinct background color (e.g., light gray) and border to indicate it's active. Hover State: Light background change on hover. Click Action: Selecting an item loads that conversation into the main chat area.
- Context Menu (More Actions): Each conversation item should have a MoreVertical icon button (or similar) that, when clicked, opens a DropdownMenu with options: "Rename": Allows in-place editing of the conversation title. "Archive": Moves the conversation to an archived state (soft delete). "Delete": Permanently removes the conversation.
- Empty State: If no conversations exist, display a friendly message like "No conversations yet" with a MessageSquare icon and a "Start coaching session" button.
- Mobile Sidebar Toggle: On mobile, the sidebar needs a close button (X icon) in its header.
- Container: A Card component, taking up available height, border-0 shadow-sm.
- Coach Persona Indicator: A small, rounded badge-like element indicating the currently active coach persona (e.g., "MOTI The Motivator" or "Custom Coach"). This should be a DropdownMenuTrigger that, when clicked, opens a dropdown to switch between saved personas (system and custom).
- Message Display Area (CardContent): Scrollable Area: Use ScrollArea component for vertical scrolling.
- Message Bubbles: User Message: Right-aligned, blue background, white text, rounded corners. Includes user avatar or initial. Assistant Message: Left-aligned, light gray background, dark text, rounded corners. Includes a distinct coach avatar.
- Message Input Area (CardFooter):
- Textarea: Main input field for typing messages. Should support multiline input and resize vertically.
- Status Indicator: A display area (e.g., a div with border) showing "Listening..." (with a pulsating red circle) or the transcribed transcript if listening is off.
- Microphone Button: A Button with Mic (to start listening) or MicOff (to stop listening) icons.
- Loading Spinner: A Loader2 (spinning) icon should replace the Send or Mic icon when the AI is processing a response.
- Header: "Start New Coaching Session".
- "Just Go" Button: A prominent button to immediately start an "Open Coaching Session."
- Setup Mode Tabs/Buttons: Two buttons/tabs to switch between:"Inspire Me", Topic List: A grid of suggested topic cards. Each card displays: Title: Bold. Description: Smaller, lighter text (truncated). Action: Clicking a card starts a new conversation with that topic."
- Input Fields: "Conversation Title" (Input). "Focus Area (Optional)" (Input). "Related Goal (Optional)" (Select dropdown populated with user's existing goals). "Start Conversation" Button: Enabled only if a title is provided.
- Tabbed Interface: Tabs component with three main tabs:"Guide" Tab, Explanation of coach personalities and how they work, "Presets" Tab, "My Custom Presets" Section
- Sliders: Individual Slider components for: Formality Level (Casual to Professional), Communication Tone (Direct to Encouraging), Humor Level (Serious to Humorous), Interaction Pace (Reflective to Dynamic). Each slider should have min/max values (1-10) and a numerical display.
- Preview Card (Right Column on Desktop): A smaller Card component displaying "Preview" and "See how your coach will communicate." Shows a sample message from the AI coach that dynamically updates based on the selected/customized personality settings. An indicator of the currently selected/applied persona (e.g., "Selected Preset: MOTI The Motivator" or "Using Custom Settings"). A prominent "Save & Return to Coach" button.
- Global Loading: A central spinner (e.g., Loader2) should be visible when initial data is being fetched for the entire page.
- All components should adapt gracefully to different screen sizes. Font sizes, padding, and margins should scale appropriately.