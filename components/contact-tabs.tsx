'use client'

import { ContactForm } from '@/components/contact-form'
import { ScheduleConsultation } from '@/components/schedule-consultation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/lib/language-context'
import { Card, CardContent } from './ui/card'

export function ContactTabs() {
  const { t } = useLanguage()

  return (
    <Tabs defaultValue="message" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="message">{t('message')}</TabsTrigger>
        <TabsTrigger value="schedule">{t('schedule')}</TabsTrigger>
      </TabsList>
      <TabsContent value="message" className="mt-4">
        <Card>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">{t('contact-form-title')}</h3>
                <p className="text-muted-foreground">{t('form-description')}</p>
              </div>
              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule" className="mt-4">
        <Card>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">{t('consultation-title')}</h3>
                <p className="text-muted-foreground">{t('schedule-time')}</p>
              </div>
              <ScheduleConsultation />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
