import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, organization, organizationType, message } = body

    // Send email to your contact address
    const { data, error } = await resend.emails.send({
      from: "DSX Contact Form <onboarding@resend.dev>",
      to: ["jesusdawarlyramirez@gmail.com"],
      subject: `New Lead: ${name} from ${organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #a8e600; border-bottom: 2px solid #a8e600; padding-bottom: 10px;">
            New Lead Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Type:</strong> ${organizationType}</p>
            <p><strong>Message:</strong> ${message || "No message provided"}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: "DSX Team <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting DSX - We'll be in touch soon!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #a8e600; border-bottom: 2px solid #a8e600; padding-bottom: 10px;">
            Thank You, ${name}!
          </h2>
          
          <p>We've received your information and will contact you within 24 hours to schedule your consultation.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What happens next?</h3>
            <ul>
              <li>Our team will review your requirements</li>
              <li>We'll schedule a consultation call within 24 hours</li>
              <li>We'll prepare a customized demo for your organization</li>
            </ul>
          </div>
          
          <p>If you have any urgent questions, feel free to call us at <strong>+1 (849) 397-0258</strong></p>
          
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The DSX Team
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
