# **App Name**: Supply Chain Command

## Core Features:

- Live Logistics Map: Display a real-time map visualizing all orders with 'In-Transit' status, using data from Firestore.
- Supplier Scorecards: Manage supplier details, performance, and linked documents from Firebase Storage.
- AI Reporting Hub (RAG): Enable users to ask questions about compliance/SOP docs using natural language, powered by Genkit and Firestore.
- AI-Powered Chatbot: Implement an AI assistant trained on the supply chain data to answer user questions, deployed via Genkit. Prioritize a 'Flash' model for speed and cost-efficiency.
- Proactive Agent: A Genkit-powered tool that monitors orders for delays and warehouse stock, queries suppliers for alternatives, and suggests a purchase order.
- Dynamic UI Rendering: Implement UI customization using a configuration-based approach with JSON schemas stored in a 'uiSchemas' collection.
- AI Visual Inspection: Mobile app integration with a Vertex AI Vision model that detects damage and verifies labels using worker-photographed delivery photos.
- Demand Forecasting: Runs predictive models on Vertex AI to forecast future material needs based on sales data.
- ML Intelligence Dashboard: Visualizes the performance, accuracy, and key drivers of the custom Vertex AI models.

## Style Guidelines:

- Primary color: A muted teal (#73A89A) for a sense of calm, reliability, and technological sophistication. The hue suggests a blend of the natural (green) and the digital (blue), fitting for a supply chain app. The lack of vibrancy and saturation lends the styling an air of sophistication.
- Background color: A light-scheme background achieved using an extremely desaturated version of the primary hue, creating a subtle and professional feel (#F0F4F3).
- Accent color: A desaturated green (#84A176) that provides contrast against the primary color while remaining analogous and complementary to the overall palette.
- Body and headline font: 'Inter' (sans-serif) for a modern, objective, neutral look suitable for both headlines and body text.
- Use consistent, clear icons representing various supply chain processes and entities (e.g., trucks, warehouses, products).
- Implement a Master-Detail layout, with main modules on the left and content/visualizations on the right for intuitive navigation.
- Subtle transitions and animations for data updates and navigation to enhance user experience without being distracting.