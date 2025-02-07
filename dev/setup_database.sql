-- Create the events table
CREATE TABLE public.events (
                               id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                               user_id UUID,
                               name TEXT NOT NULL DEFAULT 'New Event',
                               start_date DATE NOT NULL,
                               end_date DATE NOT NULL,
                               color TEXT NOT NULL,
                               type TEXT NOT NULL DEFAULT 'Event',
                               zone INTEGER NOT NULL DEFAULT 0,
                               status TEXT NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TODO: Re-enable these security measures before production
-- -- Enable Row Level Security
-- ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- -- Create a policy that allows users to see only their own events
-- CREATE POLICY "Users can only access their own events"
-- ON public.events
-- FOR ALL USING (auth.uid() = user_id);

-- -- Create a policy that allows authenticated users to insert their own events
-- CREATE POLICY "Users can insert their own events"
-- ON public.events
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (auth.uid() = user_id);

-- Create the event_types table
CREATE TABLE public.event_types (
                                    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                                    name TEXT NOT NULL UNIQUE,
                                    color TEXT NOT NULL,
                                    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default event types
INSERT INTO public.event_types (name, color) VALUES
                                                 ('Vacation', '#4CAF50'),
                                                 ('Trip', '#2196F3'),
                                                 ('Sick', '#F44336'),
                                                 ('Guests', '#FFC107'),
                                                 ('Event', '#9C27B0');

-- TODO: Re-enable these security measures before production
-- -- Enable Row Level Security for event_types
-- ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;

-- -- Create a policy that allows all authenticated users to read event_types
-- CREATE POLICY "Allow read access for all authenticated users"
-- ON public.event_types
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- -- Create a policy that allows only admins to modify event_types
-- CREATE POLICY "Allow write access for admins"
-- ON public.event_types
-- FOR ALL
-- TO authenticated
-- USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'));

