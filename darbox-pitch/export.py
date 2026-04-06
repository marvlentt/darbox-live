import asyncio
import sys
import os

try:
    from playwright.async_api import async_playwright
    import img2pdf
except ImportError:
    print("Dependencies missing. Installing...")
    os.system("pip install playwright img2pdf -q")
    os.system("playwright install chromium")
    print("Please run this script again.")
    sys.exit(0)

async def export():
    print("Starting PDF export process...")
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        file_uri = "file:///C:/Users/hp/.gemini/antigravity/scratch/darbox-pitch/index.html"
        print(f"Loading presentation from: {file_uri}")
        await page.goto(file_uri)
        
        # Hide the edit button for export
        await page.evaluate("const btn = document.querySelector('button[onclick=\"toggleEdit()\"]'); if(btn) btn.style.display='none';")
        
        slides = await page.query_selector_all(".slide")
        
        images = []
        for i, slide in enumerate(slides):
            print(f"Capturing slide {i+1}/{len(slides)}")
            await slide.scroll_into_view_if_needed()
            await page.wait_for_timeout(800) # give animations time to run
            screenshot = await slide.screenshot(type="jpeg", quality=90)
            if screenshot:
                images.append(screenshot)
        
        await browser.close()
        
        print("Writing PDF...")
        with open("DarBox_Pitch.pdf", "wb") as f:
            f.write(img2pdf.convert(images))
        print("Done! Slides exported to: DarBox_Pitch.pdf")

if __name__ == "__main__":
    asyncio.run(export())
