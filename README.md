# Prototype: React-D3.js chart
This React-based D3.js prototype showcases the integration of both technologies which dynamically manipulate the DOM. React serves as the renderer framework, rendering the D3.js elements in a visually compelling manner. The prototype features a dynamic visualization of diverse vitals, complete with hover interactivity to display relevant time windows, and a Defibrillation Button which activates a modal dialog with user input capabilities. The design decision process highlights the use of React as the primary renderer, emphasizing the seamless integration of D3.js for dynamic data visualization without causing higher latencies between both.

## Navigating on Mobile
- The SVG (Graphic) is zoomable with all classis zoom-in Mobile gestures
- Touch on a vital node for at least 1sec to see the hoverable context
- Zoom-out to initial view for the Defibrillation Modal to open properly 

### Preview

![](./public/vitalChart.png)
